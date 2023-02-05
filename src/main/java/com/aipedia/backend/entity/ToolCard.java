package com.aipedia.backend.entity;

import com.aipedia.backend.jwtconfig.SecurityUtils;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.extern.slf4j.Slf4j;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import javax.persistence.*;

/**
 * A ToolCard.
 */

@Entity
@Table(name = "tool_card")
@SuppressWarnings("common-java:DuplicatedBlocks")
@Slf4j

public class ToolCard implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    
    private String imageUrl;
    

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Column(name = "last_update")
    @Temporal(TemporalType.TIMESTAMP)

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss Z", timezone="Asia/Kolkata")
    private Date lastUpdate;
    @PrePersist
    private void onCreate() {
        lastUpdate = new Date();
    }

    @Column(name = "description")
    private String description;





    @ManyToOne(cascade = CascadeType.MERGE)
    private User creator;

    @OneToMany(mappedBy = "toolcard")
    @JsonIgnoreProperties(value = { "toolcard" }, allowSetters = true)
    private Set<Comment> comments = new HashSet<>();

    @ManyToMany()
    @JoinTable(
        name = "rel_tool_card__hashtag",
        joinColumns = @JoinColumn(name = "tool_card_id"),
        inverseJoinColumns = @JoinColumn(name = "hashtag_id")
    )
    @JsonIgnoreProperties(value = { "toolcards" }, allowSetters = true)
    private Set<HashTag> hashtags = new HashSet<>();

    @ManyToMany()
    @JoinTable(
        name = "rel_tool_card__tag",
        joinColumns = @JoinColumn(name = "tool_card_id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields her


    @OneToMany(cascade = CascadeType.ALL, mappedBy = "toolcard")
   @JsonIgnoreProperties(value = {"toolcard"})
   private List<Like> likes;
    


   
   @OneToMany(cascade = CascadeType.ALL, mappedBy = "toolcard")
   @JsonIgnoreProperties(value = {"toolcard"})
   private List<BookMark> bookmarks;


 



   public List<Like> getLikes() {
       return likes;
   }


   @Transient
   
   private Long totalLikes;


   @Transient
   private boolean currentUserLiked;


   @Transient
   private boolean currentUserBookmarked;












public List<BookMark> getBookmarks() {
    return bookmarks;
}

public boolean isCurrentUserBookmarked() {
    Optional<String> currentUser = SecurityUtils.getCurrentUserLogin();

    if (!currentUser.isPresent()) {
        return false;
    }

    return this.bookmarks.parallelStream()
            .filter(b -> b.getUser().getUsername().equals(currentUser.get())).findAny().isPresent();
}

public boolean isCurrentUserLiked() {
    Optional<String> currentUser = SecurityUtils.getCurrentUserLogin();

    if (!currentUser.isPresent()) {
        return false;
    }

    return this.likes.parallelStream()
            .filter(like -> like.getUser().getUsername().equals(currentUser.get())).findAny().isPresent();
}

public Long getTotalLikes() {
    return (long) this.likes.size();
}



public void setLikes(List<Like> likes) {
    this.likes = likes;
}

    public Long getId() {
        return this.id;
    }

    public ToolCard id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public ToolCard title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getLastUpdate() {
        return this.lastUpdate;
    }

    public ToolCard lastUpdate(Date createdDate) {
        this.setLastUpdate(createdDate);
        return this;
    }

    public void setLastUpdate(Date createdDate) {
        this.lastUpdate = createdDate;
    }

    public String getDescription() {
        return this.description;
    }

    public ToolCard description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

 

 
 

    public User getCreator() {
        return this.creator;
    }

    public void setCreator(User user) {
        this.creator = user;
    }

    public ToolCard creator(User user) {
        this.setCreator(user);
        return this;
    }

    public Set<Comment> getComments() {
        return this.comments;
    }

    public void setComments(Set<Comment> Comments) {
        if (this.comments != null) {
            this.comments.forEach(i -> i.setToolcard(null));
        }
        if (Comments != null) {
            Comments.forEach(i -> i.setToolcard(this));
        }
        this.comments = Comments;
    }

    public ToolCard comments(Set<Comment> Comments) {
        this.setComments(Comments);
        return this;
    }

    public ToolCard addComment(Comment Comment) {
        this.comments.add(Comment);
        Comment.setToolcard(this);
        return this;
    }

    public ToolCard removeComment(Comment Comment) {
        this.comments.remove(Comment);
        Comment.setToolcard(null);
        return this;
    }

    public Set<HashTag> getHashtags() {
        return this.hashtags;
    }

    public void setHashtags(Set<HashTag> HashTags) {
        this.hashtags = HashTags;
    }

    public ToolCard hashtags(Set<HashTag> HashTags) {
        this.setHashtags(HashTags);
        return this;
    }

    public ToolCard addHashtag(HashTag HashTag) {
        this.hashtags.add(HashTag);
        HashTag.getToolcards().add(this);
        return this;
    }

    public ToolCard removeHashtag(HashTag HashTag) {
        this.hashtags.remove(HashTag);
        HashTag.getToolcards().remove(this);
        return this;
    }

    public Set<Tag> getTags() {
        return this.tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public ToolCard tags(Set<Tag> tags) {
        this.setTags(tags);
        return this;
    }

    public ToolCard addTag(Tag tag) {
        this.tags.add(tag);
        return this;
    }

    public ToolCard removeTag(Tag tag) {
        this.tags.remove(tag);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ToolCard)) {
            return false;
        }
        return id != null && id.equals(((ToolCard) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ToolCard{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", createdDate='" + getLastUpdate() + "'" +
            ", description='" + getDescription() + "'" +
            
                 ", imageUrl=' "+getImageUrl()+"'"+
            "}";
    }

}
