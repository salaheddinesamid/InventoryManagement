package com.inventory.application.filters;

import jakarta.servlet.*;
import org.springframework.stereotype.Component;

import java.io.IOException;
@Component
public class SimpleFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // Get the remote host of client's device
        System.out.println("Remote Host:" + request.getRemoteHost());
        // Get the remote address of client's address
        System.out.println("Remote Address" + request.getRemoteAddr());
        // Filter http requests and response
        chain.doFilter(request,response);
    }

    @Override
    public void destroy() {
        Filter.super.destroy();
    }
}