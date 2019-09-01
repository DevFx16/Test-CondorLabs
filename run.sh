if [ -d "$node_modules"]; 
    then
        echo "Folder exists"
    else
        npm i
fi
sudo ln -s $HOME/Projects/Test-CondorLabs/node_modules $HOME/Projects/Test-CondorLabs/Frontend/node_modules
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

