FROM python:3.12

WORKDIR /usr/local/app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt
RUN patchright install chromium --with-deps

EXPOSE 5000

CMD ["python", "app.py"]