package com.aipedia.backend.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aipedia.backend.entity.User;
import com.aipedia.backend.exceptionhandler.EmailAlreadyUsedException;
import com.aipedia.backend.exceptionhandler.InvalidPasswordException;
import com.aipedia.backend.exceptionhandler.RecordNotFoundException;
import com.aipedia.backend.jwtconfig.PasswordChangeDTO;
import com.aipedia.backend.jwtconfig.SecurityUtils;
import com.aipedia.backend.repository.UserRepository;
import com.aipedia.backend.service.UserService;

/**
 * REST controller for managing the current user's account.
 */
@RestController
public class AccountResource {

    private final UserService userService;

    public AccountResource(UserRepository userRepository, UserService userService) {
        this.userService = userService;

    }

    /**
     * {@code POST  /register} : register the user.
     *
     * @param managedUserVM the managed user View Model.
     * @throws URISyntaxException
     * @throws InvalidPasswordException {@code 400 (Bad Request)} if the password is incorrect.
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is already used.
     * @throws LoginAlreadyUsedException {@code 400 (Bad Request)} if the login is already used.
     */
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Map<String, String>> registerAccount(@Valid @RequestBody User managedUserVM)
            throws URISyntaxException {

        User user = userService.registerUser(managedUserVM);

        Map<String, String> hasMap = new HashMap<>();
        hasMap.put("response", "created sucessfully!");
        hasMap.put("URI", new URI("/user/" + user.getId()).toString());

        return new ResponseEntity<Map<String, String>>(hasMap, HttpStatus.CREATED);

    }
    @PostMapping(path = "user/account/change-password")
    public void changePassword(@RequestBody PasswordChangeDTO passwordChangeDto) {

        userService.changePassword(passwordChangeDto.getCurrentPassword(), passwordChangeDto.getNewPassword());
    }

    @Autowired
    UserRepository ur;

    @GetMapping("/admin/users")
    public List<User> allUsers() {
        return ur.findAll();
    }

    @GetMapping(value = "user/{id}")
    public User getToolCardById(@PathVariable("id") Long id) throws RecordNotFoundException {

        return ur.findById(id).orElseThrow(() -> new RecordNotFoundException("User is not found in db"));
    }

    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<User> partialUpdateToolCard(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody User user
    ) throws URISyntaxException {

        if (!ur.existsById(id)) {
            throw new RecordNotFoundException("Entity not found");
        }

        Optional<User> result = ur
                .findById(id)
                .map(existingUser -> {
                    if (user.getFirstName() != null) {
                        existingUser.setFirstName(user.getFirstName());
                    }

                    if (existingUser.getLastName() != null) {
                        existingUser.setLastName(user.getLastName());
                    }

                    if (user.getImageUrl() != null) {
                        existingUser.setImageUrl(user.getImageUrl());
                    }
                    if (user.getEmail() != null) {
                        existingUser.setEmail(user.getEmail());
                    }

                    return existingUser;
                })
                .map(ur::save);

        return ResponseEntity.created(new URI("/user/" + result.get().getId())).body(result.get());

    }

    @Autowired
    UserRepository userRepository;
    
    @GetMapping(value = "user/profile")
    public User getProfile() throws RecordNotFoundException {

        Optional<String> username = SecurityUtils.getCurrentUserLogin();

        Optional<User> userr = userRepository.findByUsername(username.get());
        if (!userr.isPresent()) {
            throw new RecordNotFoundException("logged in User not found");

        }

        return ur.findById(userr.get().getId()).orElseThrow(() -> new RecordNotFoundException("User is not found in db"));
    }

}

