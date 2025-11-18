package com.audio.audio_transcribe;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/transcribe")
@CrossOrigin(origins = "*")
public class TranscriptionController {

    @Value("${groq.api.key}")
    private String groqApiKey;

    private static final String GROQ_API_URL = "https://api.groq.com/openai/v1/audio/transcriptions";

    @PostMapping
    public ResponseEntity<String> transcribeAudio(
            @RequestParam("file") MultipartFile file) throws IOException {

        // Prepare headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.setBearerAuth(groqApiKey);

        // Prepare multipart body
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new MultipartInputStreamFileResource(file.getInputStream(), file.getOriginalFilename()));
        body.add("model", "whisper-large-v3");
        body.add("language", "en");
        body.add("response_format", "json");

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // Make API call
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.postForEntity(GROQ_API_URL, requestEntity, Map.class);

        // Extract transcription text
        String transcription = (String) response.getBody().get("text");

        return new ResponseEntity<>(transcription, HttpStatus.OK);
    }

    // Helper class for multipart file upload
    static class MultipartInputStreamFileResource extends ByteArrayResource {
        private final String filename;

        public MultipartInputStreamFileResource(java.io.InputStream inputStream, String filename) throws IOException {
            super(inputStream.readAllBytes());
            this.filename = filename;
        }

        @Override
        public String getFilename() {
            return this.filename;
        }
    }
}