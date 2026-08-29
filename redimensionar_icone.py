from PIL import Image
import os

# Caminhos absolutos limpos
caminho_entrada = r"D:\Midia\Method\public\favicon"
caminho_saida = r"D:\Midia\Method\public\favicon.png"

# Se o arquivo sem extensão existir, usa ele. Se não, usa o .png existente
if os.path.exists(caminho_entrada):
    img = Image.open(caminho_entrada)
elif os.path.exists(caminho_saida):
    img = Image.open(caminho_saida)
else:
    print("Erro crítico: Nenhum arquivo de favicon foi encontrado na pasta public.")
    exit()

# Redimensiona estritamente para 48x48
img_redimensionada = img.resize((48, 48), Image.Resampling.LANCZOS)

# Salva diretamente como favicon.png
img_redimensionada.save(caminho_saida, "PNG")

print("SUCESSO ABSOLUTO! O arquivo foi salvo como favicon.png em 48x48.")