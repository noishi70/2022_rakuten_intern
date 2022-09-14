import cv2
import numpy as np
import io
import uuid
import base64
import os


def save_icon_imag(
    img: str,
    old_path: str
):
    img_binary = base64.b64decode(img)
    jpg=np.frombuffer(img_binary,dtype=np.uint8)
    img = cv2.imdecode(jpg, cv2.IMREAD_COLOR)
    if old_path != './img/defalut.jpg':
        os.remove(old_path)
    path = './img/' + str(uuid.uuid4()) + '.jpg' 
    cv2.imwrite(path, img)
    return path

def change_imag_to_base64(
    path: str
):
    b64_img = ""
    with open(path, 'br') as f:
        b64_img = base64.b64encode(f.read())
    return b64_img