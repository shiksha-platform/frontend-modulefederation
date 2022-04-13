#!/bin/bash
rm -rf prod-build
mkdir prod-build
mkdir prod-build/modules
find packages \( ! -path packages/common-lib -o ! -path packages/teacher-app \) -type d  -maxdepth 1 -mindepth 1 -exec bash -c '
for f  do
    # echo $f
    if [ $f != "packages/common-lib" ] &&  [ $f != "packages/teacher-app" ] ; then
        echo "Processing ${f//packages\//}"
        cp -rf "$f/build" "prod-build/modules/${f//packages\//}"
    fi
done 
' sh {} +
cp -r  packages/teacher-app/build/* prod-build/
find  prod-build -name  'modules.json' | xargs sed -i 's|http://localhost:[0-9]*||g'
cd prod-build && tar -cf ../shiksha-ui.tar . && cd ../
          
          

