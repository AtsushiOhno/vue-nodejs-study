FROM python:3.9.9-slim-buster

WORKDIR /usr/src

COPY file ./
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

CMD [ "python3", "/usr/src/myapp.py" ]