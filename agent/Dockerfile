FROM python:3.12

WORKDIR /usr/local/app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt
RUN playwright install chromium --with-deps --no-shell

EXPOSE 5000

CMD ["python", "app.py"]