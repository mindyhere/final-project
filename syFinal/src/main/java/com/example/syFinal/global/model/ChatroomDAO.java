package com.example.syFinal.global.model;

import java.util.List;

public interface ChatroomDAO {


	String create(String room, int g_idx, int h_idx, String message);

	// List<MessageDTO> entrance(int g_idx, int h_idx);
	
	List<MessageDTO> entrance(String m_roomId);

	List<MessageDTO> g_list(String sender);

	List<MessageDTO> h_list(String sender);

	MessageDTO last_message(String m_roomId);

	void insert(MessageDTO message);

	String receive(String m_sender, String m_roomId);

	// List<MessageDTO> list(String sender);
	
}
