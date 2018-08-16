all: install webpack collectstatic migrate

install:
	@npm install
	@pip install -Ur requirements/base.txt

webpack:
	@webpack --display-error-details

makemessages:
	@cd smappi && python ../manage.py makemessages -l ru --no-wrap --no-location

compilemessages:
	@cd smappi && python ../manage.py compilemessages

collectstatic:
	@python ./manage.py collectstatic --noinput

loaddata:
	@python ./manage.py loaddata $(FIXTURES)

migrate:
	@python ./manage.py migrate

geoip:
	@mkdir -p data && cd data && wget http://geolite.maxmind.com/download/geoip/database/GeoLite2-City.mmdb.gz && gunzip -f GeoLite2-City.mmdb.gz && cd -
