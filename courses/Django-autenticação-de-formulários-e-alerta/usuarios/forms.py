from django import forms

class LoginForms(forms.Form):
    nome_login = forms.CharField(
        label = "Nome de Login",
        required = True,
        max_length=100,
        widget=forms.TextInput(
            attrs={
                "class": "form-control",
                "placeholder": "Ex: Lucas Oliveira"
            }
        )
    )
    senha_login = forms.CharField(
        label = "Senha de Login",
        required = True,
        max_length=70,
        widget=forms.PasswordInput(
            attrs={
                "class": "form-control",
                "placeholder": "Digite sua senha"
            }
        )
    )
    
class CadastroForms(forms.Form):
    nome_cadastro = forms.CharField(
        label = "Nome",
        required = True,
        max_length=100,
        widget=forms.TextInput(
            attrs={
                "class": "form-control",
                "placeholder": "Ex: Lucas Oliveira"
            }
        )
    )
    email_cadastro = forms.EmailField(
    label = "Email de cadastro",
    required = True,
    max_length=100,
    widget=forms.EmailInput(
        attrs={
            "class": "form-control",
            "placeholder": "Ex: seunome@xpto.com"
        }
    )
    )
    senha_cadastro = forms.CharField(
        label = "Senha de cadastro",
        required = True,
        max_length=70,
        widget=forms.PasswordInput(
            attrs={
                "class": "form-control",
                "placeholder": "Digite sua senha"
            }
        )
    )
    confirmar_senha_cadastro = forms.CharField(
        label = "Confirmar senha",
        required = True,
        max_length=70,
        widget=forms.PasswordInput(
            attrs={
                "class": "form-control",
                "placeholder": "Digite sua senha novamente"
            }
        )
    )
    
    def clean_nome_cadastro(self):
        nome = self.cleaned_data.get("nome_cadastro")
        
        if nome:
            nome = nome.strip()
            if " " in nome:
                raise forms.ValidationError("Não eh possivel inserir espaços no nome de usuario")
            else:
                return nome