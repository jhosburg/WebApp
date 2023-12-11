# serializers.py
from rest_framework import serializers
from .models import JsonModel
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError



UserModel = get_user_model()



		
class UserRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
	def create(self, clean_data):
		user_obj = UserModel.objects.create_user(email=clean_data['email'], password=clean_data['password'])
		user_obj.username = clean_data['username']
		user_obj.save()
		return user_obj
	


################################
# class UserProfileSerializer(serializers.Serializer):
# 	username = serializers.usernameField()
	
# 	##
# 	def check_user(self, clean_data):
# 		user = authenticate(username=clean_data['username'])
# 		if not user:
# 			raise ValidationError('user not found')
# 		return user

# class UserProfileSerializer(serializers.Serializer):
#     username = serializers.CharField()

#     def check_user(self, clean_data):
#         user = authenticate(username=clean_data['username'])
#         if not user:
#             raise ValidationError('User not found')
#         return user
	
##########################

class UserLoginSerializer(serializers.Serializer):
	email = serializers.EmailField()
	password = serializers.CharField()
	##
	def check_user(self, clean_data):
		user = authenticate(username=clean_data['email'], password=clean_data['password'])
		if not user:
			raise ValidationError('user not found')
		return user

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('email', 'username')

class JsonModelSerializer(serializers.Serializer):
    file = serializers.FileField()

    def create(self, validated_data):
        return JsonModel.objects.create(file=validated_data['file'])



# class ProfileViewSerializer(serializers.Serializer):
#     username = serializers.CharField()

#     def check_user(self, cleaned_data):
#         username = cleaned_data.get('username')
#         user = authenticate(username=username)

#         if not user:
#             raise ValidationError('User not found')

#         return user


class ProfileViewSerializer(serializers.Serializer):
    username = serializers.CharField()