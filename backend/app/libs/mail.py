import os
import textwrap
from datetime import datetime

from fastapi_mail import ConnectionConfig, FastMail, MessageSchema

from pydantic import EmailStr

mail_conf = ConnectionConfig(
    MAIL_USERNAME=os.environ["MAIL_USERNAME"],
    MAIL_PASSWORD=os.environ["MAIL_PASSWORD"],
    MAIL_FROM=EmailStr(os.environ["MAIL_FROM"]),
    MAIL_PORT=int(os.environ["MAIL_PORT"]),
    MAIL_SERVER=os.environ["MAIL_SERVER"],
    MAIL_TLS=True,
    MAIL_SSL=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
)


def registration_mail_body(
    mail_to: str,
    registration_url: str,
    valid_until: datetime,
) -> str:
    # [TODO] : Provisional body
    return textwrap.dedent(
        f"""
    こんにちは、{mail_to} さん

    本サービスに仮登録いただきありがとうございます。


    ユーザー登録手続きはまだ完了しておりません。
    以下のURLにアクセスして、本人のメールアドレスである事を確認します。
    {registration_url}

    本URLは {valid_until.strftime("%Y-%m-%d %H:%M:%S")} まで有効です。
    有効期限経過後は再度メールアドレス登録から行ってください。


    運営チーム

    """
    )


def password_reset_mail_body(
    mail_to: str,
    reset_url: str,
    valid_until: datetime,
) -> str:
    # [TODO] : Provisional body
    return textwrap.dedent(
        f"""
    こんにちは、{mail_to} さん

    パスワードの変更申請を受け付けました。
    下記のURLから、パスワード変更手続きをしてください。

    {reset_url}

    本URLは {valid_until.strftime("%Y-%m-%d %H:%M:%S")} まで有効です。
    有効期限経過後は再度「パスワードを忘れた場合」より設定をお願いいたします。

    ※メール文章中のURLをクリックしても登録ページが表示されない場合は、URLをすべてコピーして、
    ブラウザのアドレス欄に貼付けてアクセスしてください。
    （メーラーの設定によってクリックのみでは正しく開けない場合があります）

    なお、このメールに覚えがない場合、他の方がメールアドレスを間違えて入力した可能性があります。
    パスワードが変更されることはありません。

    運営チーム

    """
    )


async def send_mail(mail_to: str, subject: str, body: str) -> None:
    if not EmailStr.validate(mail_to):
        # If given address is invalid
        # Return False or throw error
        return

    msg = MessageSchema(
        recipients=[EmailStr(mail_to)],
        subject=subject,
        body=body,
    )

    fm = FastMail(mail_conf)
    await fm.send_message(message=msg)
    return