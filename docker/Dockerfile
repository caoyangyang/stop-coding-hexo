FROM nginx:1.15.12-alpine

ADD docker/nginx.conf /etc/nginx/nginx.conf
ADD public/ /usr/share/nginx/public

RUN chmod -R 755 /usr/share/nginx/public/

