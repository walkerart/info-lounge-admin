bundle exec middleman build --clean
/usr/bin/rsync --exclude=.git* -e ssh -vzrpgt --links --copy-unsafe-links --partial build/ walkerart@citra:/home/walkerart/wac_admin/infolounge/
