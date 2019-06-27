package com.bit.web.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.websocket.server.PathParam;

import com.bit.web.common.util.PageProxy;
import com.bit.web.common.util.Printer;
import com.bit.web.domain.CustomerDTO;
import com.bit.web.service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
* CustomerController
 * @param <p>
*/
@RestController
@RequestMapping("/customers")
public class CustomerController<p> {
    @Autowired CustomerService customerService;
    @Autowired CustomerDTO customer;
    @GetMapping("/count{test}")
    public String zzz(@PathParam("test") String test) {
        System.out.println("카운터옮 :" + test);
        // System.out.println("customerController.count()");
        // //int count = customerService.countAll();
        // int count = 11;
        // p.accept("람다 고객수 : " + count);
        // System.out.println("고객수 : " + count);
        return  "100";
    }
   @GetMapping("/{customerId}/{password}")
   public CustomerDTO login(@PathVariable("customerId")String id,
                       @PathVariable("password")String pass){
                           System.out.println("도착");
       customer.setCustomerId(id);
       customer.setPassword(pass);
  
       return customerService.login(customer);
   }

   @PostMapping("")
   public HashMap<String,Object> join(@RequestBody CustomerDTO param){
        System.out.println("=====post mapping======");
        System.out.println(param.getCustomerId());
        System.out.println(param.getPassword());
        System.out.println(param.getSsn());
        System.out.println(param.getAddress());
        System.out.println("=====post mapping======");

        
        customer.setCustomerId(param.getCustomerId());
        customer.setPassword(param.getPassword());
        customer.setCustomerName(param.getCustomerName());
        customer.setSsn(param.getSsn());
        customer.setPhone(param.getPhone());
        customer.setCity(param.getCity());
        customer.setAddress(param.getAddress());
        customer.setPostalcode(param.getPostalcode());
        customerService.insertCustomer(customer);
        HashMap<String,Object> map = new HashMap<>();
        map.put("result", "SUCCESS");
        return map;
   }
//    @GetMapping("/{customerId}")
//    public CustomerDTO search() {
//         customerService.findCustomers(PageProxy pxy);
//        return customer;
//    }
   @PutMapping("/{customerId}")
   public HashMap<String,Object> update(@RequestBody CustomerDTO param) {

            System.out.println("=====post mapping======");
            System.out.println(param.getCustomerId());
            System.out.println(param.getPassword());
            System.out.println(param.getSsn());
            System.out.println(param.getAddress());
            System.out.println("=====post mapping======");

            
            customer.setCustomerId(param.getCustomerId());
            customer.setPassword(param.getPassword());
            customer.setCustomerName(param.getCustomerName());
            customer.setSsn(param.getSsn());
            customer.setPhone(param.getPhone());
            customer.setCity(param.getCity());
            customer.setAddress(param.getAddress());
            customer.setPostalcode(param.getPostalcode());


            customerService.updateCustomer(customer);
            HashMap<String,Object> map = new HashMap<>();

            map.put("result", "SUCCESS");
        return map;   
    }
   @DeleteMapping("/{customerId}")
   public HashMap<String,Object> delete(@PathVariable("customerId") String customerId) {
        customer.setCustomerId(customerId);
        customerService.deleteCustomer(customer);
        HashMap<String,Object> map = new HashMap<>();

    return map;
   }
   @GetMapping("/page/{pageNum}")
    public HashMap<String, Object> list(@PathVariable String pageNum){
        // List<CustomerDTO> list = new ArrayList<>();
        //rowCount, pageNum, pageSize, blockSize
        HashMap<String, Object> map = new HashMap<>();


        return map;
        
        // list = customerService.findCustomers(pxy);
        // for (CustomerDTO customer : list) {
        //     System.out.println(customer.getCustomerId()+" : "
        //                     +customer.getCustomerName()+" : "
        //                     +customer.getPassword()+" : "
        //                     +customer.getSsn()+" : "
        //                     +customer.getPhone()+" : "
        //                     +customer.getCity()+" : "
        //                     +customer.getAddress()+" : "
        //                     +customer.getPostalcode());
        // }
    }
  
}