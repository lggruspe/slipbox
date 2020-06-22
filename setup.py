import setuptools

with open("README.md") as fp:
    long_description = fp.read()

setuptools.setup(
    name="slipbox",
    version="0.3.1",
    author="Levi Gruspe",
    author_email="mail.levig@gmail.com",
    description="Tools for managing notes",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/lggruspe/slipbox",
    packages=setuptools.find_packages(),
    package_data={
        "slipbox": ["filters/*.lua", "data/*.js", "*.sql"],
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Environment :: Console",
        "Operating System :: POSIX",
    ],
    python_requires=">=3.8",
)
