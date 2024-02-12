
<p align="center">
<img src="https://i.imgur.com/u4GU6f3.jpeg" alt="RobleBOT" width="800"/>
  
> Antes de usar este repositorio, visita la:
**[Política de RobleBOT. ⚠️](https://github.com/Fede55xd/RobleBOT/blob/master/terms.md)** 
</p>

<p align="center">
<a href="#"><img title="RobleBOT" src="https://img.shields.io/badge/SI TE AGRADA EL REPOSITORIO APOYAME CON UNA 🌟 ¡GRACIAS! -red?colorA=%255ff0000&colorB=%23017e40&style=for-the-badge"></a> 
<img src="https://i.pinimg.com/originals/d4/3c/90/d43c902873d4db8c85974dfd0798030b.gif" height="28px">
</p>  

<p align="center">
<a href="#"><img title="RobleBOT" src="https://img.shields.io/badge/LEA TODO EL README-red?colorA=%F77F48FF&colorB=%F77F48FF&style=for-the-badge"></a> 
<a href="#"><img title="RobleBOT" src="https://img.shields.io/badge/COMPATIBLE CON LA VERSIÓN MULTI DISPOSITIVOS DE WHATSAPP-red?colorA=%F77F48FF&colorB=%F77F48FF&style=for-the-badge"></a>
</p>

<p align="center">   
<a href="https://github.com/Fede55xd/RobleBOT/network/members"><img title="Forks" src="https://img.shields.io/github/forks/Fede55xd/RobleBOT?label=Forks&color=blue&style=flat-square"></a>
<a href="https://github.com/Fede55xd/RobleBOT/watchers"><img title="Watchers" src="https://img.shields.io/github/watchers/Fede55xd/RobleBOT?label=Watchers&color=green&style=flat-square"></a>
<a href="https://github.com/Fede55xd/RobleBOT/stargazers"><img title="Stars" src="https://img.shields.io/github/stars/Fede55xd/RobleBOT?label=Stars&color=yellow&style=flat-square"></a>
</p>

<div align="center">
  
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@RobleUY)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/robleuy)
</div>

------------------
### ⚡ ACTIVAR EN REPLIT
<a target="_blank" href="https://replit.com/github/Fede55xd/RobleBOT"><img alt="Run on Replit" src="https://binbashbanana.github.io/deploy-buttons/buttons/remade/replit.svg"></a>
<a href="https://replit.com/github/Fede55xd/RobleBOT"> <img src="https://media0.giphy.com/media/lMwu8EJAnv9kmn51KQ/giphy.gif" height="29px"></a>
------------------
### ☁️ ACTIVAR EN RENDER 
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://dashboard.render.com/blueprint/new?repo=https%3A%2F%2Fgithub.com%2FFede55xd%2FRobleBOT) 
------------------
### 🌟 ACTIVAR EN TERMUX
### INSTALACIÓN AUTOMÁTICA 🫰
> **Note** Comandos para instalar de forma automática en Termux  
```bash
termux-setup-storage
```
```bash
apt update -y && yes | apt upgrade && pkg install -y bash wget mpv && wget -O - https://raw.githubusercontent.com/Fede55xd/RobleBOT/master/roblebot.sh | bash
```
```js
// TAMBIÉN PUEDES PERSONALIZAR LA INSTALACIÓN AUTOMÁTICA (En caso de una Bifurcación)
// Parámetros editables

// REFERENCIA
"wget -O - https://raw.githubusercontent.com/Fede55xd/RobleBOT/master/roblebot.sh | bash"

// PARÁMETROS QUE PUEDE SER MODIFICADOS --> "[...]"
"wget -O - https://raw.githubusercontent.com/[usuario]/[repositorio]/[rama]/roblebot.sh | bash"
```
#### MODIFICAR ARCHIVO [`roblebot.sh`](https://github.com/Fede55xd/RobleBOT/blob/master/roblebot.sh)
```js
//LÍNEAS A MODIFICAR
205 --> "git clone https://github.com/[user]/[repositorio].git"
//Ejemplo: git clone https://github.com/Fede55xd/RobleBOT.git

209 --> "cd [repositorio]"
//Ejemplo: cd RobleBOT

//Una vez hecho estos cambios ejecute los nuevos comandos en Termux
```
-----
### 🪄 (OPCIÓN 2) INSTALACIÓN MANUAL POR TERMUX - GITHUB 
> **Note** Comandos para instalar de forma manual
```bash
termux-setup-storage
```
```bash
apt update && apt upgrade && pkg install -y git nodejs ffmpeg imagemagick yarn
```
```bash
git clone https://github.com/Fede55xd/RobleBOT && cd RobleBOT
```
```bash
yarn install && npm install
```
```bash
npm start
```
> **Warning** Si aparece (Y/I/N/O/D/Z) [default=N] ? use la letra "y" + "ENTER" para continuar con la instalación 
------------------
### 📁 (OPCIÓN 3) INSTALACIÓN POR TERMUX - ARCHIVOS
> **Note** Descargué y Descomprime
### [`RobleBOT ~ Archivos`](https://github.com/Fede55xd/RobleBOT/archive/refs/heads/master.zip)
[![blog](https://img.shields.io/badge/Termux-RobleBOT-FF0000?style=for-the-badge&logo=youtube&logoColor=white)
](https://youtu.be/UcWlyQ8u5HE)
```bash
termux-setup-storage
```
```bash
apt update && apt upgrade && pkg install -y git nodejs ffmpeg imagemagick yarn
```
```bash
cd storage/downloads/RobleBOT-master/RobleBOT-master 
```
```bash
yarn install
```
```bash
npm install
```
```bash
npm start
```
* #### APLICACIÓN RECOMENDADA PARA [`DESCOMPRIMIR`](https://play.google.com/store/apps/details?id=com.rarlab.rar)
* #### APLICACIÓN RECOMENDADA PARA EDITAR [`NÚMERO DE OWNER`](https://play.google.com/store/apps/details?id=com.rhmsoft.code)
> **Note** Guardar los archivos en la ubicación: storage/downloads/RobleBOT-master/RobleBOT-master   
----
### 🚀 USAR RobleBOT 24/7 EN TERMUX 
> Ejecutar estos comandos dentro de la carpeta RobleBOT
```bash
termux-wake-lock && npm i -g pm2 && pm2 start index.js && pm2 save && pm2 logs 
``` 
#### ⬇️ Opciones Disponibles
> **Warning** Esto eliminará todo el historial que hayas establecido con PM2:
```bash 
pm2 delete index
``` 
> Si tienes cerrado Termux y quiere ver de nuevo la ejecución use:
```bash 
pm2 logs 
``` 
> Si desea detener la ejecución de Termux use:
```bash 
pm2 stop index
``` 
> Si desea iniciar de nuevo la ejecución de Termux use:
```bash 
pm2 start index
``` 
----
### ✅ ACTUALIZAR RobleBOT
> **Note** Comandos para actualizar RobleBOT de forma automática
```bash
grep -q 'bash\|wget' <(dpkg -l) || apt install -y bash wget && wget -O - https://raw.githubusercontent.com/Fede55xd/RobleBOT/master/update.sh | bash 
```
#### Para que no pierda su progreso en RobleBOT, estos comandos realizarán un respaldo de su `database.json` y se agregará a la versión más reciente.
> **Warning** Estos comandos solo funcionan para TERMUX, REPLIT, LINUX                           
----
------------------
## 💻 PARA USUARIOS DE WINDOWS/VPS/RDP

* Descargar e instala Git [`Aquí`](https://git-scm.com/downloads)
* Descargar e instala NodeJS [`Aquí`](https://nodejs.org/en/download)
* Descargar e instala FFmpeg [`Aquí`](https://ffmpeg.org/download.html) (**No olvide agregar FFmpeg a la variable de entorno PATH**)
* Descargar e instala ImageMagick [`Aquí`](https://imagemagick.org/script/download.php)
* Descargar e instala Yarn [`Aquí`](https://classic.yarnpkg.com/en/docs/install#windows-stable)
```bash
git clone https://github.com/Fede55xd/RobleBOT && cd GataBot-MD && npm install && npm update && node .
```
## 💻 Instalación de FFmpeg para Windows 
* Descarga cualquiera de las versiones de FFmpeg disponibles haciendo clic en [FFmpeg](https://www.gyan.dev/ffmpeg/builds/).
* Extraer archivos a `C:\` path.
* Cambie el nombre de la carpeta extraída a `ffmpeg`.
* Ejecute el símbolo del sistema como administrador.
* Ejecute el siguiente comando:
```cmd
> setx /m PATH "C:\ffmpeg\bin;%PATH%"
```
Si tiene éxito, le dará un mensaje como: `SUCCESS: specified value was saved`.
* Ahora que tiene FFmpeg instalado, verifique que funcionó ejecutando este comando para ver la versión:
```cmd
> ffmpeg -version
```
----
### 💠 [`IDIOMAS DISPONIBLES PARA RobleBOT`](https://github.com/Fede55xd/RobleBOT/blob/master/config.js) 
#### 🌐 Español  
#### 🌐 Inglés (English) 
#### 🌐 Portugués (Português)
#### 🌐 Indonesio (Bahasa Indonesia) 
#### 🌐 Árabe (عرب)
#### 🌐 Hindi (Indian Language)
----
