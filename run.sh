sudo ln -s $HOME/Projects/Test-CondorLabs/node_modules $HOME/Projects/Test-CondorLabs/Frontend/node_modules
cd Frontend/
rm -rf build
npm run build
cd ..
sudo fuser -k -n tcp 3000
npm start