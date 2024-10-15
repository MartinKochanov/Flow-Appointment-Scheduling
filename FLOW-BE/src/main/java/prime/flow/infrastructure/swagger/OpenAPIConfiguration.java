package prime.flow.infrastructure.swagger;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityScheme.Type;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenAPIConfiguration {

  @Bean
  public OpenAPI defineOpenApi() {
    Server server = new Server()
        .url("http://localhost:8080/")
        .description("Development");

    Info info = new Info()
        .title("Flow API")
        .version("1.0")
        .description("API Documentation");

    SecurityScheme securityScheme = new SecurityScheme()
        .type(Type.HTTP)
        .scheme("bearer")
        .bearerFormat("JWT")
        .in(SecurityScheme.In.HEADER)
        .name("Authorization");

    Components components = new Components()
        .addSecuritySchemes("bearer", securityScheme);

    SecurityRequirement securityRequirement = new SecurityRequirement().addList("bearer");

    return new OpenAPI()
        .info(info)
        .servers(List.of(server))
        .components(components)
        .addSecurityItem(securityRequirement);
  }
}
