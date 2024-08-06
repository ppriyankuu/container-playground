FROM ubuntu:latest

# Install necessary packages
RUN apt-get update && \
    apt-get install -y wget curl git gnupg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install code-server
RUN curl -fsSL https://code-server.dev/install.sh | sh

# Expose port 8080
EXPOSE 8080

# Start code-server and bind to 0.0.0.0
CMD ["code-server", "--bind-addr", "0.0.0.0:8080", "--auth", "none", "--disable-telemetry"]