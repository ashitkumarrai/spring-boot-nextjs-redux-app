package com.aipedia.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;



import java.io.Serializable;
import javax.persistence.*;

/**
 * A Like.
 */
@Table(name = "jhi_like")
@Entity


public class Like implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    public Like() {
    }

    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonIgnoreProperties(value = { "creator", "comments", "hashtags", "tags","likes","title","description" }, allowSetters = true)
    private ToolCard toolcard;

    @ManyToOne
    @JsonIgnoreProperties(value = {"password","email","roles"})
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Like(ToolCard toolcard, User user) {
        this.toolcard = toolcard;
        this.user = user;
    }

  
    public Long getId() {
        return this.id;
    }

    public Like id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ToolCard getToolcard() {
        return this.toolcard;
    }

    public void setToolcard(ToolCard toolCard) {
        this.toolcard = toolCard;
    }

    public Like toolcard(ToolCard toolCard) {
        this.setToolcard(toolCard);
        return this;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Like user(User user) {
        this.setUser(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Like)) {
            return false;
        }
        return id != null && id.equals(((Like) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Like{" +
            "id=" + getId() +
            "}";
    }
    

  
}
