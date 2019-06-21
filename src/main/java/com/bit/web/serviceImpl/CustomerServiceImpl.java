package com.bit.web.serviceImpl;

import java.util.List;

import com.bit.web.domain.CustomerDTO;
import com.bit.web.service.CustomerService;

import org.springframework.stereotype.Service;

/**
 * CustomerServiceImpl
 */
@Service
public class CustomerServiceImpl implements CustomerService {

    @Override
    public void insertCustomer(CustomerDTO customer) {

    }

    @Override
    public List<CustomerDTO> findCustomers() {
        return null;
    }

    @Override
    public List<CustomerDTO> findCustomersByOption(CustomerDTO option) {
        return null;
    }

    @Override
    public CustomerDTO findCustomerBycustomerId(String customerId) {
        return null;
    }

    @Override
    public int updateCustomer(CustomerDTO customer) {
        return 0;
    }

    @Override
    public void deleteCustomer(CustomerDTO customer) {

    }

    @Override
    public int countAll() {
        return 0;
    }

    @Override
    public CustomerDTO login(CustomerDTO customer) {
        return null;
    }

}