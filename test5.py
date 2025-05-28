import customtkinter as ctk
import tkinter.font as tkfont
import os

# ウィンドウの設定
ctk.set_appearance_mode("light")  # ライトモード
ctk.set_default_color_theme("blue")  # テーマカラー

# ルートウィンドウ
root = ctk.CTk()
root.title("Leelawadee Font in CustomTkinter")
root.geometry("400x400")

# 利用可能なフォントを確認
available_fonts = list(tkfont.families())
leelawadee_fonts = [f for f in available_fonts if "Leelawadee" in f]
print("利用可能なLeelawadeeフォント:", leelawadee_fonts)

# フォントが存在しない場合のフォールバック
fallback_font = "Arial" if "Arial" in available_fonts else "TkDefaultFont"

# サンプルテキスト
sample_text = "Hello, こんにちは!"

# Leelawadeeフォントのリスト（試したいウェイト）
leelawadee_variants = [
    "Leelawadee UI",
    "Leelawadee UI Bold",
    "Leelawadee UI Semilight",
    "Leelawadee",
    "Leelawadee Bold"
]

# ウィジェットを配置
row = 0
for font_name in leelawadee_variants:
    try:
        if font_name in available_fonts:
            # CTkFontオブジェクトを作成
            my_font = ctk.CTkFont(family=font_name, size=16)
            
            # ラベル
            label = ctk.CTkLabel(
                master=root,
                text=f"{font_name}: {sample_text}",
                font=my_font
            )
            label.grid(row=row, column=0, padx=10, pady=5, sticky="w")
            
            # ボタン
            button = ctk.CTkButton(
                master=root,
                text=f"{font_name} Button",
                font=my_font,
                command=lambda x=font_name: print(f"{x} button clicked!")
            )
            button.grid(row=row, column=1, padx=10, pady=5, sticky="w")
            
            row += 1
        else:
            print(f"フォント '{font_name}' はシステムにありません。")
    except Exception as e:
        print(f"フォント '{font_name}' の使用に失敗: {e}")

# フォールバックフォントのラベル（Leelawadeeが見つからない場合）
if not leelawadee_fonts:
    fallback_label = ctk.CTkLabel(
        master=root,
        text=f"Leelawadeeが見つかりません。フォールバック: {fallback_font}: {sample_text}",
        font=ctk.CTkFont(family=fallback_font, size=16)
    )
    fallback_label.grid(row=row, column=0, columnspan=2, padx=10, pady=10)

# メインループ
root.mainloop()