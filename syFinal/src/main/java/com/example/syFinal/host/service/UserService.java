package com.example.syFinal.host.service;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.syFinal.host.model.dto.HostDTO;

@Service
public class UserService implements UserDetailsService {
	@Autowired
	SqlSession sqlSession;

	@Override
	public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
		System.out.println("user service ");
		Map<String, Object> user = null;
		if (userId == null) {
			throw new UsernameNotFoundException(userId);
		}
		// List<GrantedAuthority> authority = new ArrayList<>();
		// authority.add(new SimpleGrantedAuthority(user.get("AUTORITY").toString()));

		return new HostDTO(userId, userId, null, userId, userId, userId, userId);
	}
}
