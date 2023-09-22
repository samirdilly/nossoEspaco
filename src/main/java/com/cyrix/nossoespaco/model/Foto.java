package com.cyrix.nossoespaco.model;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="foto")
public class Foto implements Serializable{
	

	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String caption;
    
    private String imageUrl;
    		
    		
    		
    		public Long getId() {
    			return id;
    		}

    		public void setId(Long id) {
    			this.id = id;
    		}

    		public String getCaption() {
    			return caption;
    		}

    		public void setCaption(String caption) {
    			this.caption = caption;
    		}

    		public String getImageUrl() {
    			return imageUrl;
    		}

    		public void setImageUrl(String imageUrl) {
    			this.imageUrl = imageUrl;
    		}
   		
}
