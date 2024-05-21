package com.example.syFinal.global.model;

import java.util.List;

public interface ChatroomDAO {


	String create(String room, int g_idx, int h_idx, String message);

	List<MessageDTO> entrance(int g_idx, int h_idx);

	List<MessageDTO> g_list(int g_idx);

	List<MessageDTO> h_list(int h_idx);

	MessageDTO last_message(int g_idx, int m_h_idx);
	
}
