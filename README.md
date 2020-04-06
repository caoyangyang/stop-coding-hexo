docker build -t blog:v1 -f ci/Dockerfile .  
docker run --name blog -p 80:1234 -d blog:v1