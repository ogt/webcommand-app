for b in 'webcommand-app' 'sorter' 'awker' 'seder'
do
    git checkout $b
    git push $b $b:master
done
