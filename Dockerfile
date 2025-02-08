# Usa una imagen oficial de Node.js como base
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install --omit=dev

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que corre el servidor
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["npm", "start"]