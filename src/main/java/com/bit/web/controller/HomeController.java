package com.bit.web.controller;

import com.bit.web.common.util.Printer;
import com.bit.web.domain.CustomerDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * HomeController
 */
@Controller
public class HomeController {
    @Autowired CustomerDTO customerService; 
    @RequestMapping("/")   
    public String index() {
        return "index";
    }
  
}