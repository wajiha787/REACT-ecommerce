# Use official Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN pip install --no-cache-dir flask flask-cors psycopg2-binary

# Expose port Flask runs on
EXPOSE 5000

# Start the server
CMD ["python", "app.py"]
