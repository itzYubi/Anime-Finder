package com.yubi.animeFinder.controller;

import com.yubi.animeFinder.model.FormModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.yubi.animeFinder.service.EmailService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FormController {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    private final EmailService emailService;
    private final MessageSource messageSource;

    @Autowired
    public FormController(EmailService emailService,
                          MessageSource messageSource) {
        this.emailService = emailService;
        this.messageSource = messageSource;
    }

    @GetMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }

    @PostMapping("/anime/recommendation")
    public ResponseEntity<FormModel> postRecommendation(@RequestBody FormModel formModel) {
        //generative AI service

        //send email
        String to = formModel.getEmail();
        String subject = messageSource.getMessage("app.global.anime.recommender.mail.Subject",
                                                null, LocaleContextHolder.getLocale());
        String text = messageSource.getMessage("app.global.anime.recommender.mail.description",
                                                    new Object[]{formModel.getUserName()},
                                                    LocaleContextHolder.getLocale());
        logger.info("Text is: " + text);

        //emailService.sendEmail(to, subject, text);


        //return
        return ResponseEntity.ok(formModel);
    }

}
