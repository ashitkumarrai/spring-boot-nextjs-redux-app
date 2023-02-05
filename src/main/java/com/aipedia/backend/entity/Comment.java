package com.aipedia.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;


/**
 * A Comment.
 */
@Entity
@Table(name = "comment")
public class Comment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "body")
    private String body;
    @Column(name = "last_update")
    @Temporal(TemporalType.TIMESTAMP)

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss Z", timezone="Asia/Kolkata")
    private Date lastUpdate;
    @PrePersist
    private void onCreate() {
        lastUpdate = new Date();
    }

    @ManyToOne
    @JsonIgnoreProperties(value = { "creator", "comments", "hashtags", "tags","description","lastUpdate","likes","imageUrl","totalLikes","currentUserLiked" }, allowSetters = true)
    private ToolCard toolcard;

    @ManyToOne
    @JsonIgnoreProperties(value = {})
    private User creator;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Comment id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBody() {
        return this.body;
    }

    public Comment body(String body) {
        this.setBody(body);
        return this;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Date getLastUpdate() {
        return this.lastUpdate;
    }

    public Comment createdDate(Date createdDate) {
        this.setLastUpdate(createdDate);
        return this;
    }

    public void setLastUpdate(Date createdDate) {
        this.lastUpdate = createdDate;
    }

    public ToolCard getToolcard() {
        return this.toolcard;
    }

    public void setToolcard(ToolCard ToolCard) {
        this.toolcard = ToolCard;
    }

    public Comment toolcard(ToolCard ToolCard) {
        this.setToolcard(ToolCard);
        return this;
    }

    public User getCreator() {
        return this.creator;
    }

    public void setCreator(User user) {
        this.creator = user;
    }

    public Comment creator(User user) {
        this.setCreator(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Comment)) {
            return false;
        }
        return id != null && id.equals(((Comment) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Comment{" +
            "id=" + getId() +
            ", body='" + getBody() + "'" +
            ", createdDate='" + getLastUpdate() + "'" +
            "}";
    }
}
