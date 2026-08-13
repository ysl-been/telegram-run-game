import os

from telegram import (
    Update,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    WebAppInfo,
)

from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
)


# ==========================================
# Environment Variables
# ==========================================

TOKEN = os.getenv("TOKEN")
GAME_URL = os.getenv("GAME_URL")


if not TOKEN:
    raise RuntimeError(
        "TOKEN environment variable is missing"
    )


if not GAME_URL:
    raise RuntimeError(
        "GAME_URL environment variable is missing"
    )


# ==========================================
# /start
# ==========================================

async def start(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE
):

    keyboard = InlineKeyboardMarkup([
        [
            InlineKeyboardButton(
                "🎮 开始跑酷",
                web_app=WebAppInfo(
                    url=GAME_URL
                )
            )
        ]
    ])

    await update.message.reply_text(
        "🏃 跑酷游戏\n\n"
        "🧱 障碍物会从左边冲过来\n"
        "⬆️ 跳跃躲避高障碍\n"
        "⬇️ 下蹲躲避低障碍\n"
        "❤️ 你有 3 条命\n\n"
        "点击下面开始游戏！",
        reply_markup=keyboard
    )


# ==========================================
# /run
# ==========================================

async def run_game(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE
):

    keyboard = InlineKeyboardMarkup([
        [
            InlineKeyboardButton(
                "🎮 PLAY",
                web_app=WebAppInfo(
                    url=GAME_URL
                )
            )
        ]
    ])

    await update.message.reply_text(
        "🏃 准备开始！",
        reply_markup=keyboard
    )


# ==========================================
# /help
# ==========================================

async def help_command(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE
):

    await update.message.reply_text(
        "🎮 跑酷游戏\n\n"
        "/start - 开始\n"
        "/run - 打开游戏\n"
        "/help - 帮助"
    )


# ==========================================
# 建立 Bot
# ==========================================

app = Application.builder().token(TOKEN).build()


# ==========================================
# Commands
# ==========================================

app.add_handler(
    CommandHandler(
        "start",
        start
    )
)

app.add_handler(
    CommandHandler(
        "run",
        run_game
    )
)

app.add_handler(
    CommandHandler(
        "help",
        help_command
    )
)


# ==========================================
# 启动
# ==========================================

print("🤖 Bot Started!")

app.run_polling()
