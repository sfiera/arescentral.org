PY?=python
PELICAN?=pelican
PELICANOPTS?=

BASEDIR=$(CURDIR)
INPUTDIR=$(BASEDIR)/content
OUTPUTDIR=$(BASEDIR)/output
CONFFILE=$(BASEDIR)/conf.py

PYTHONDONTWRITEBYTECODE=1
export PYTHONDONTWRITEBYTECODE

help:
	@echo 'Makefile for a pelican Web site                                           '
	@echo '                                                                          '
	@echo 'Usage:                                                                    '
	@echo '   make html                           (re)generate the web site          '
	@echo '   make clean                          remove the generated files         '
	@echo '   make regenerate                     regenerate files upon modification '
	@echo '   make publish                        generate using production settings '
	@echo '   make serve [PORT=8000]              serve site at http://localhost:8000'

html:
	SITEURL= $(PELICAN) -s $(CONFFILE) $(PELICANOPTS)

html-staging:
	SITEURL=//staging.arescentral.org $(PELICAN) -s $(CONFFILE) $(PELICANOPTS)

html-public:
	SITEURL=//arescentral.org $(PELICAN) -s $(CONFFILE) $(PELICANOPTS)

clean:
	[ ! -d $(OUTPUTDIR) ] || rm -rf $(OUTPUTDIR)

regenerate:
	SITEURL= $(PELICAN) -s $(CONFFILE) $(PELICANOPTS)

serve:
ifdef PORT
	cd $(OUTPUTDIR) && $(PY) -m pelican.server $(PORT)
else
	cd $(OUTPUTDIR) && $(PY) -m pelican.server
endif

stage: html-staging
	rsync -rcv --delete output/ staging.arescentral.org:/srv/www/staging.arescentral.org/htdocs/

deploy: html-public
	rsync -rcv --delete output/ arescentral.org:/srv/www/arescentral.org/htdocs/

.PHONY: help html html-staging html-public clean regenerate serve stage deploy
