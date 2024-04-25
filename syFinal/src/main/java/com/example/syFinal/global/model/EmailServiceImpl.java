package com.example.syFinal.global.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMessage.RecipientType;

@Service
public class EmailServiceImpl implements EmailService {
	@Autowired
	JavaMailSender mailSender;

	@Override
	public void sendMail(EmailDTO dto) {
		try {
			MimeMessage msg = mailSender.createMimeMessage();
			System.out.println(dto.getReceiveMail());
			msg.addRecipient(RecipientType.TO, new InternetAddress(dto.getReceiveMail()));
			msg.addFrom(new InternetAddress[] { new InternetAddress(dto.getSenderMail(), dto.getSenderName()) });
			msg.setSubject(dto.getSubject(), "utf-8");
			msg.setText(dto.getMessage(), "utf-8");
			mailSender.send(msg);// 전송
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
