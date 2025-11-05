package com.jobportal.jwt;


import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtHelper jwtHelper;


    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(@SuppressWarnings("null") HttpServletRequest request, @SuppressWarnings("null") HttpServletResponse response, @SuppressWarnings("null") FilterChain filterChain) throws ServletException, IOException {

//        try {
//            Thread.sleep(500);
//        } catch (InterruptedException e) {
//            throw new RuntimeException(e);
//        }
        //Authorization

    String requestHeader = request.getHeader("Authorization");
        //Bearer 2352345235sdfrsfgsdfsdf
        // logger.info(" Header :  {}", requestHeader);
        String username = null;
        String token = null;
        // Expect header in format: "Bearer <token>" (note the space after Bearer)
        if (requestHeader != null) {
            String headerTrim = requestHeader.trim();
            // case-insensitive check for "bearer " and tolerate extra spaces
            if (headerTrim.length() > 6 && headerTrim.substring(0, 6).equalsIgnoreCase("bearer")) {
                int firstSpace = headerTrim.indexOf(' ');
                if (firstSpace > 0 && firstSpace + 1 < headerTrim.length()) {
                    token = headerTrim.substring(firstSpace + 1).trim();
                } else {
                    // Bearer present but token missing
                    logger.info("Authorization header contains 'Bearer' but no token was provided.");
                }
            } else {
                // header present but not a Bearer token
                logger.debug("Authorization header present but not a Bearer token: " + requestHeader);
            }
        } else {
            // no Authorization header - do not log at INFO to avoid noise
        }
        // If we got a token, try to extract username and validate; otherwise continue silently
        if (token != null) {
            try {
                username = this.jwtHelper.getUsernameFromToken(token);
            } catch (IllegalArgumentException e) {
                logger.info("Illegal Argument while fetching the username !!");
                logger.debug("Exception: ", e);
            } catch (ExpiredJwtException e) {
                logger.info("Given jwt token is expired !!");
                logger.debug("Expired token: ", e);
            } catch (MalformedJwtException e) {
                logger.info("Malformed/invalid JWT token");
                logger.debug("Malformed token exception: ", e);
            } catch (Exception e) {
                logger.debug("Unexpected exception while parsing token", e);
            }
        }


        //
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {


            //fetch user detail from username
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            Boolean validateToken = this.jwtHelper.validateToken(token, userDetails.getUsername());
            if (validateToken) {

                //set the authentication
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);


            } else {
                logger.info("Validation fails !!");
            }


        }

        filterChain.doFilter(request, response);


    }
}
