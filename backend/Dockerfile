FROM python:3.10

WORKDIR /app

COPY requirements.txt .
COPY ./app /

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y libgl1-mesa-dev

RUN pip install --no-cache-dir --trusted-host pypi.python.org -r /app/requirements.txt

EXPOSE 4000 

CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "4000"]