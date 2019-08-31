if [ -d "$node_modules"]; 
    then
        echo "Folder exists"
    else
        npm i
fi
cd Frontend/

if [ -d "$node_modules"]; 
    then
        echo "Folder exists"
    else
        npm 
fi
rm -rf build
npm run build
cd ..
sudo fuser -k -n tcp 3000 
npm start
