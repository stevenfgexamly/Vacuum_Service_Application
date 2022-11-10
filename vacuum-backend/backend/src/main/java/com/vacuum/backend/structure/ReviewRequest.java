package com.vacuum.backend.structure;

import java.util.List;

import com.vacuum.backend.entities.Reviews;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewRequest {

    String scode;
    String sname;
    List<Reviews> reviews;
    
}
