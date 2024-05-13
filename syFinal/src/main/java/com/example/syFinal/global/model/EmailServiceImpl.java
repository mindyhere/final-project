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
	public String sendMail(EmailDTO dto) {
		String result = "";
		try {
			MimeMessage msg = mailSender.createMimeMessage();
			msg.addRecipient(RecipientType.TO, new InternetAddress(dto.getReceiveMail()));
			msg.addFrom(new InternetAddress[] { new InternetAddress(dto.getSenderMail(), dto.getSenderName()) });
			msg.setSubject(dto.getSubject(), "utf-8");
			msg.setText(dto.getMessage(), "utf-8");
			mailSender.send(msg);// 전송
			result = "success";
		} catch (Exception e) {
			e.printStackTrace();
			result = "fail";
		}
		return result;
	}

	@Override
	public String getTempPassword() {
		char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
				'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

		String str = "";
		int idx = 0;
		for (int i = 0; i < 10; i++) {
			idx = (int) (charSet.length * Math.random());
			str += charSet[idx];
		}
		return str;
	}

	@Override
	public EmailDTO prepareTempPwdEmail(String email, String randomPw) {
		EmailDTO emailPw = new EmailDTO();
		emailPw.setSubject("임시 비밀번호 안내");
		emailPw.setMessage(
				"안녕하세요. 임시 비밀번호 안내 관련 이메일 입니다." + " 회원님의 임시 비밀번호는 " + randomPw + " 입니다." + " 로그인 후 비밀번호를 변경해 주세요.");
		emailPw.setReceiveMail(email);
		emailPw.setSenderName("Notice");
		emailPw.setSenderMail("notice@gmail.com");
		return emailPw;
	}

}
