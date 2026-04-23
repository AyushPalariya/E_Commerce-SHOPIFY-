FROM nginx:alpine

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy all your HTML/JS/CSS files
COPY . /usr/share/nginx/html

# Copy your custom nginx config (note: it should be copied to conf.d/default.conf to override correctly)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
