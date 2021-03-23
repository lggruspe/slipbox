import setuptools

with open("../README.md") as fp:
    long_description = fp.read()

setuptools.setup(
    name="slipbox",
    version="0.16.0",
    author="Levi Gruspe",
    author_email="mail.levig@gmail.com",
    description="Static-site generator for Zettelkasten notes",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/lggruspe/slipbox",
    packages=setuptools.find_packages(),
    package_data={
        "slipbox": ["data/*", "*.sql", "templates/*"]
    },
    classifiers=[
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "License :: OSI Approved :: MIT License",
        "Environment :: Console",
    ],
    install_requires=["climates==0.0.3"],
    python_requires=">=3.8",
    entry_points={
        "console_scripts": [
            "slipbox=slipbox.__main__:main"
        ]
    }
)
