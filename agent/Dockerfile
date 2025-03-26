FROM python:3.12

WORKDIR /usr/local/app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt
RUN playwright install-deps
RUN playwright install chromium

EXPOSE 5000

CMD ["python", "app.py"]