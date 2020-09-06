# run on local
```bash
nvm use
npm i
npm run server
```

# run with docker
```bash
docker build -t blog:v1 -f ci/Dockerfile .  
docker run --name blog -p 3000:4321 -d blog:v1
```
