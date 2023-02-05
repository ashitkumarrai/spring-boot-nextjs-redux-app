package com.aipedia.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A HashTag.
 */


@Entity
@Table(name = "hash_tag")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class HashTag implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name",unique=true)
    private String name;

    @ManyToMany(mappedBy = "hashtags")
@JsonIgnore()
    private Set<ToolCard> toolcards = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public HashTag id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public HashTag name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<ToolCard> getToolcards() {
        return this.toolcards;
    }

    public void setToolcards(Set<ToolCard> ToolCards) {
        if (this.toolcards != null) {
            this.toolcards.forEach(i -> i.removeHashtag(this));
        }
        if (ToolCards != null) {
            ToolCards.forEach(i -> i.addHashtag(this));
        }
        this.toolcards = ToolCards;
    }

    public HashTag toolcards(Set<ToolCard> ToolCards) {
        this.setToolcards(ToolCards);
        return this;
    }

    public HashTag addToolcard(ToolCard ToolCard) {
        this.toolcards.add(ToolCard);
        ToolCard.getHashtags().add(this);
        return this;
    }

    public HashTag removeToolcard(ToolCard ToolCard) {
        this.toolcards.remove(ToolCard);
        ToolCard.getHashtags().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof HashTag)) {
            return false;
        }
        return id != null && id.equals(((HashTag) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "HashTag{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

 

   
}
