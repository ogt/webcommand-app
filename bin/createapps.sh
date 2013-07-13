for b in "$@"
do
    git checkout -b $b
    heroku create $b
    git remote add $b git@heroku.com:$b.git
    git push -f $b $b:master
done
git checkout master
