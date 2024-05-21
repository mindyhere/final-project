package com.example.syFinal.global.model;

import java.util.HashSet;
import java.util.Set;

import org.springframework.web.socket.WebSocketSession;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MessageDTO {
	private int m_idx;
	private String m_roomId;
	private int m_h_idx;
	private int m_g_idx;
	private String m_message;
	private Set<WebSocketSession> sessions = new HashSet<>();
	private String h_name;
	private String h_profile;
	private String m_send_date;
}
