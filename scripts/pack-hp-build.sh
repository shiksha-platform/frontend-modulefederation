#!/bin/bash
# update the API url in environment file 

rm -rf hp-build
mkdir hp-build
mkdir hp-build/modules
find packages \
\( \
 -path packages/attendance \
-o -path packages/core \) \
-type d  -maxdepth 1 -mindepth 1 -exec bash -c '
for f  do
    # echo $f
    if [ $f != "packages/common-lib" ] &&  [ $f != "packages/teacher-app" ] ; then
        echo "Processing ${f//packages\//}"
        cp -rf "$f/build" "hp-build/modules/${f//packages\//}"
    fi
done 
' sh {} +
# do not copy teachers app
# cp -r  packages/teacher-app/build/* hp-build/
find  hp-build -name  'modules.json' | xargs sed -i 's|http://localhost:[0-9]*||g'
cd hi-build && tar -cf ../shiksha-hp-ui.tar . && cd ../
