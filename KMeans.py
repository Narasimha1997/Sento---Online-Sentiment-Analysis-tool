import pandas as pd
import numpy as np
from sklearn.datasets import load_iris


data = load_iris()

DF = pd.DataFrame(data, columns = data.feature_names)

X = data.data

Y = data.target

from sklearn.model_selection import train_test_split

x_train, x_test, y_train, y_test = train_test_split(X, Y, test_size = 0.2)

from sklearn.neighbors import KNeighborsClassifier

classifier = KNeighborsClassifier(n_neighbors = 5)

classifier.fit(x_train, y_train)

predictions = classifier.predict(x_test)

from sklearn.metrics import accuracy_score, confusion_matrix

print("Test Accuracy : ", accuracy_score(y_test, classifier.predict(x_test)))

print("Confusion Matrix : ", confusion_matrix(y_test, classifier.predict(x_test)))