package com.aipedia.backend.exceptionhandler;

public class UserDisabledException extends RuntimeException{
    


  public UserDisabledException(String exception) {
    super(exception);
  }
}
